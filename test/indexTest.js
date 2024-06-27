const chai = require("chai");
const fs = require("fs");
const path = require("path");
const globalJsdom = require("global-jsdom");

chai.use(require("chai-dom"));
const { expect } = chai;

const html = fs.readFileSync(path.resolve(__dirname, "..", "index.html"), "utf-8");

globalJsdom(html);

describe("index.html", () => {
  describe("valid document structure", () => {
    it("has a DOCTYPE tag", () => {
      expect(html).to.contain("<!DOCTYPE html>");
    });

    it("has opening and closing HTML tags", () => {
      expect(html).to.contain("<html");
      expect(html).to.contain("</html>");
    });

    it("has <head> and <body> tags nested in the <html> tag", () => {
      expect(html).to.contain("<head>");
      expect(html).to.contain("</head>");
      expect(html).to.contain("<body>");
      expect(html).to.contain("</body>");
    });

    it("has a language attribute in the <html> tag", () => {
      const htmlElement = document.querySelector("html");
      expect(htmlElement).to.have.attribute("lang", "en");
    });
  });

  describe("valid <head> structure", () => {
    it("has a <link> tag that links to an external stylesheet", () => {
      const link = document.querySelector("head > link[rel='stylesheet']");
      expect(link).to.have.attribute("href", "style.css");
    });

    it("has a <title> tag to enclose the site title", () => {
      const title = document.querySelector("head > title");
      expect(title).to.exist;
      expect(title).to.contain.text("My Site Title");
    });
  });

  describe("valid unordered list", () => {
    it("has an unordered list with grilled cheese ingredients", () => {
      const ul = document.querySelector("ul");
      expect(ul).to.exist;
      const items = ul.querySelectorAll("li");
      expect(items.length).to.be.at.least(3);
      expect(items[0]).to.contain.text("2 slices of bread");
      expect(items[1]).to.contain.text("4 slices of cheese");

      const nestedUl = items[1].querySelector("ul");
      expect(nestedUl).to.exist;
      const nestedItems = nestedUl.querySelectorAll("li");
      expect(nestedItems.length).to.equal(3);
      expect(nestedItems[0]).to.contain.text("cheddar");
      expect(nestedItems[1]).to.contain.text("mozzarella");
      expect(nestedItems[2]).to.contain.text("pepper jack");
    });
  });

  describe("valid ordered list", () => {
    it("has an ordered list with steps to make grilled cheese", () => {
      const ol = document.querySelector("ol");
      expect(ol).to.exist;
      const items = ol.querySelectorAll("li");
      expect(items.length).to.equal(5);
      expect(items[0]).to.contain.text("Spread butter on bread and frying pan");
      expect(items[1]).to.contain.text("Place bread in frying pan and fry");
      expect(items[2]).to.contain.text("Add cheese on top of bread");
      expect(items[3]).to.contain.text("Cover with second slice of bread");
      expect(items[4]).to.contain.text("Turn over and fry for 2 minutes");
    });
  });
});
