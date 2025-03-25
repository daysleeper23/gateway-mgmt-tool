beforeEach(() => {
  cy.visit("/");
});

const GATEWAY_COUNT = 39;
const ACTIVE_COUNT = 33;
const INACTIVE_COUNT = 3;
const UNAVAILABLE_COUNT = 0;
const UNSTABLE_COUNT = 1;
const OFFLINE_COUNT = 2;

const VERSION_1_4_4_4_COUNT = 38;
const VERSION_1_4_4_3_COUNT = 1;

const SIMULATED_GATEWAY_COUNT = 38;
const REAL_GATEWAY_COUNT = 1;

describe("Tanstack List View - Rendering", () => {
  it("should render list view correctly", () => {
    cy.get('[data-testid="list-view"]').should("exist");
    cy.get('[data-testid="list-header"]').should("exist");
    cy.get('[data-testid="list-row"]').should("have.length", GATEWAY_COUNT);
    cy.get('[data-testid="list-toolbar"]').should("exist");
    cy.get('[data-testid="list-filter-status"]').should("exist");
    cy.get('[data-testid="list-filter-version"]').should("exist");
    cy.get('[data-testid="list-filter-model"]').should("exist");
    cy.get('[data-testid="list-filter-reset"]').should("not.exist");
  });
});

describe("Tanstack List View - Sorting", () => {
  it("should sort by last message timestamp DESC at the beginning", () => {
    cy.get('[data-testid="list-row"]')
      .first()
      .should("contain", "gatewaySink47Sink48");
  });

  it("should sort by last message timestamp ASC when the button is clicked once", () => {
    cy.get('[data-testid="list-sort-last-message"]').click();
    cy.wait(200);
    cy.get('[data-testid="list-row"]')
      .first()
      .should("contain", "gatewaySink1Sink2");
  });

  it("should sort by last message timestamp DESC when the button is clicked twice", () => {
    cy.get('[data-testid="list-sort-last-message"]').click();
    cy.wait(200);
    cy.get('[data-testid="list-sort-last-message"]').click();
    cy.wait(200);
    cy.get('[data-testid="list-row"]')
      .first()
      .should("contain", "gatewaySink47Sink48");
  });
});

describe("Tanstack List View - Filter Bar", () => {
  it("should open dropdown when click on Status", () => {
    cy.get('[data-testid="list-filter-status"]').click();
    cy.wait(200);
    cy.get('[data-testid="list-filter-dropdown"]').should("exist");
    cy.get('[data-testid="list-filter-dropdown"]').should("contain", "ACTIVE");
    cy.get('[data-testid="list-filter-dropdown"]').should(
      "contain",
      "INACTIVE",
    );
    cy.get('[data-testid="list-filter-dropdown"]').should(
      "contain",
      "UNAVAILABLE",
    );
    cy.get('[data-testid="list-filter-dropdown"]').should(
      "contain",
      "UNSTABLE",
    );
    cy.get('[data-testid="list-filter-dropdown"]').should("contain", "OFFLINE");
  });

  it("should open dropdown when click on Version", () => {
    cy.get('[data-testid="list-filter-version"]').click();
    cy.wait(200);
    cy.get('[data-testid="list-filter-dropdown"]').should("exist");
    cy.get('[data-testid="list-filter-dropdown"]').should("contain", "1.4.4.4");
    cy.get('[data-testid="list-filter-dropdown"]').should("contain", "1.4.4.3");
  });

  it("should open dropdown when click on Model", () => {
    cy.get('[data-testid="list-filter-model"]').click();
    cy.wait(200);
    cy.get('[data-testid="list-filter-dropdown"]').should("exist");
    cy.get('[data-testid="list-filter-dropdown"]').should(
      "contain",
      "Simulated Gateway",
    );
    cy.get('[data-testid="list-filter-dropdown"]').should(
      "contain",
      "Real Gateway",
    );
  });

  it("should reset filters when click on Reset - 1 filter", () => {
    cy.get('[data-testid="list-filter-status"]').click();
    cy.wait(200);
    cy.get('[data-testid="list-filter-dropdown"]').contains("ACTIVE").click();
    cy.wait(200);
    cy.get('[data-testid="list-row"]').should("have.length", ACTIVE_COUNT);
    cy.get('[data-testid="list-filter-reset"]').click();
    cy.wait(200);
    cy.get('[data-testid="list-row"]').should("have.length", GATEWAY_COUNT);
  });

  it("should reset filters when click on Reset - 2 filters", () => {
    cy.get('[data-testid="list-filter-status"]').click();
    cy.wait(200);
    cy.get('[data-testid="list-filter-dropdown"]').contains("ACTIVE").click();
    cy.wait(200);

    cy.get('[data-testid="list-filter-version"]').click();
    cy.wait(200);
    cy.get('[data-testid="list-filter-dropdown"]').contains("1.4.4.4").click();
    cy.wait(200);

    cy.get('[data-testid="list-filter-reset"]').click();
    cy.wait(200);
    cy.get('[data-testid="list-row"]').should("have.length", GATEWAY_COUNT);
    cy.get('[data-testid="list-filter-selected"]').should("not.exist");
  });

  it("should reset filters when click on Reset - 3 filters", () => {
    cy.get('[data-testid="list-filter-status"]').click();
    cy.wait(200);
    cy.get('[data-testid="list-filter-dropdown"]').contains("ACTIVE").click();
    cy.wait(200);

    cy.get('[data-testid="list-filter-version"]').click();
    cy.wait(200);
    cy.get('[data-testid="list-filter-dropdown"]').contains("1.4.4.4").click();
    cy.wait(200);

    cy.get('[data-testid="list-filter-model"]').click();
    cy.wait(200);
    cy.get('[data-testid="list-filter-dropdown"]')
      .contains("Simulated Gateway")
      .click();
    cy.wait(200);

    cy.get('[data-testid="list-filter-reset"]').click();
    cy.wait(200);
    cy.get('[data-testid="list-row"]').should("have.length", GATEWAY_COUNT);
    cy.get('[data-testid="list-filter-selected"]').should("not.exist");
  });

  it("should remove all checked options when click on Clear filters", () => {
    cy.get('[data-testid="list-filter-status"]').click();
    cy.wait(200);
    cy.get('[data-testid="list-filter-dropdown"]').contains("ACTIVE").click();
    cy.wait(200);
    cy.get('[data-testid="list-filter-clear"]').should("exist");

    cy.get('[data-testid="list-filter-dropdown"]').contains("INACTIVE").click();
    cy.wait(200);
    cy.get('[data-testid="list-filter-clear"]').should("exist");

    cy.get('[data-testid="list-filter-clear').click();
    cy.wait(200);
    cy.get('[data-testid="list-filter-clear"]').should("not.exist");
  });
});

describe("Tanstack List View - Filtering Logic", () => {
  it("should show correct number of rows while filtering one or multiple options", () => {
    cy.get('[data-testid="list-filter-status"]').click();
    cy.wait(200);
    cy.get('[data-testid="list-filter-dropdown"]').contains("ACTIVE").click();
    cy.wait(200);
    cy.get('[data-testid="list-row"]').should("have.length", ACTIVE_COUNT);

    cy.get('[data-testid="list-filter-dropdown"]').contains("INACTIVE").click();
    cy.wait(200);
    cy.get('[data-testid="list-row"]').should(
      "have.length",
      ACTIVE_COUNT + INACTIVE_COUNT,
    );

    cy.get('[data-testid="list-filter-dropdown"]').contains("UNSTABLE").click();
    cy.wait(200);
    cy.get('[data-testid="list-row"]').should(
      "have.length",
      ACTIVE_COUNT + INACTIVE_COUNT + UNSTABLE_COUNT,
    );

    cy.get('[data-testid="list-filter-dropdown"]').contains("OFFLINE").click();
    cy.wait(200);
    cy.get('[data-testid="list-row"]').should(
      "have.length",
      ACTIVE_COUNT + INACTIVE_COUNT + UNSTABLE_COUNT + OFFLINE_COUNT,
    );

    cy.get('[data-testid="list-filter-dropdown"]')
      .contains("UNAVAILABLE")
      .click();
    cy.wait(200);
    cy.get('[data-testid="list-row"]').should(
      "have.length",
      ACTIVE_COUNT +
        INACTIVE_COUNT +
        UNSTABLE_COUNT +
        OFFLINE_COUNT +
        UNAVAILABLE_COUNT,
    );
  });

  it("should filter by Version when click on one of the options", () => {
    cy.get('[data-testid="list-filter-version"]').click();
    cy.wait(200);
    cy.get('[data-testid="list-filter-dropdown"]').contains("1.4.4.4").click();
    cy.wait(200);
    cy.get('[data-testid="list-row"]').should(
      "have.length",
      VERSION_1_4_4_4_COUNT,
    );

    cy.get('[data-testid="list-filter-dropdown"]').contains("1.4.4.3").click();
    cy.wait(200);
    cy.get('[data-testid="list-row"]').should(
      "have.length",
      VERSION_1_4_4_4_COUNT + VERSION_1_4_4_3_COUNT,
    );
  });

  it("should filter by Model when click on one of the options", () => {
    cy.get('[data-testid="list-filter-model"]').click();
    cy.wait(200);
    cy.get('[data-testid="list-filter-dropdown"]')
      .contains("Simulated Gateway")
      .click();
    cy.wait(200);
    cy.get('[data-testid="list-row"]').should(
      "have.length",
      SIMULATED_GATEWAY_COUNT,
    );

    cy.get('[data-testid="list-filter-dropdown"]')
      .contains("Real Gateway")
      .click();
    cy.wait(200);
    cy.get('[data-testid="list-row"]').should(
      "have.length",
      SIMULATED_GATEWAY_COUNT + REAL_GATEWAY_COUNT,
    );
  });

  it("should render all data after clicking on Reset", () => {
    cy.get('[data-testid="list-filter-status"]').click();
    cy.wait(200);
    cy.get('[data-testid="list-filter-dropdown"]').contains("ACTIVE").click();
    cy.wait(200);
    cy.get('[data-testid="list-row"]').should("have.length", ACTIVE_COUNT);

    cy.get('[data-testid="list-filter-reset"]').click();
    cy.wait(200);
    cy.get('[data-testid="list-row"]').should("have.length", GATEWAY_COUNT);
  });
});

describe("Tanstack List View - Responsive UI", () => {
  it("should show only essential columns on extra small screens", () => {
    cy.viewport("iphone-6");
    cy.visit("/");
    cy.wait(200);

    cy.get('[data-testid="list-header"]')
      .first()
      .within(() => {
        cy.contains(/Gateway ID/).should("be.visible");
        cy.contains(/Status/).should("be.visible");
        cy.contains(/Last Message/).should("not.be.visible");
        cy.contains(/Sink/).should("not.be.visible");
        cy.contains(/Model/).should("not.be.visible");
        cy.contains(/Version/).should("not.be.visible");
        cy.contains(/Description/).should("not.be.visible");
      });

    cy.get('[data-testid="list-toolbar"]').should("be.visible");
    cy.get('[data-testid="list-filter-status"]').should("be.visible");
  });

  it("should show additional columns on small screens", () => {
    cy.viewport(640, 1136);
    cy.visit("/");
    cy.wait(200);

    cy.get('[data-testid="list-header"]')
      .first()
      .within(() => {
        cy.contains(/Gateway ID/).should("be.visible");
        cy.contains(/Status/).should("be.visible");
        cy.contains(/Last Message/).should("be.visible");
        cy.contains(/Sink/).should("not.be.visible");
        cy.contains(/Model/).should("not.be.visible");
        cy.contains(/Version/).should("not.be.visible");
        cy.contains(/Description/).should("not.be.visible");
      });

    cy.get('[data-testid="list-toolbar"]').should("be.visible");
    cy.get('[data-testid="list-filter-status"]').should("be.visible");
  });

  it("should show more columns on medium screens", () => {
    cy.viewport("ipad-mini");
    cy.visit("/");
    cy.wait(200);

    cy.get('[data-testid="list-header"]')
      .first()
      .within(() => {
        cy.contains(/Gateway ID/).should("be.visible");
        cy.contains(/Status/).should("be.visible");
        cy.contains(/Last Message/).should("be.visible");
        cy.contains(/Sink/).should("be.visible");
        cy.contains(/Model/).should("not.be.visible");
        cy.contains(/Version/).should("not.be.visible");
        cy.contains(/Description/).should("not.be.visible");
      });

    cy.get('[data-testid="list-toolbar"]').should("be.visible");
    cy.get('[data-testid="list-filter-status"]').should("be.visible");
    cy.get('[data-testid="list-filter-version"]').should("be.visible");
    cy.get('[data-testid="list-filter-model"]').should("be.visible");
  });

  it("should show all columns including description on large screens", () => {
    cy.viewport("macbook-16");
    cy.visit("/");
    cy.wait(200);

    cy.get('[data-testid="list-header"]')
      .first()
      .within(() => {
        cy.contains(/Gateway ID/).should("be.visible");
        cy.contains(/Status/).should("be.visible");
        cy.contains(/Last Message/).should("be.visible");
        cy.contains(/Sink/).should("be.visible");
        cy.contains(/Model/).should("be.visible");
        cy.contains(/Version/).should("be.visible");
        cy.contains(/Description/).should("be.visible");
      });

    cy.get('[data-testid="list-toolbar"]').should("be.visible");
    cy.get('[data-testid="list-filter-status"]').should("be.visible");
    cy.get('[data-testid="list-filter-version"]').should("be.visible");
    cy.get('[data-testid="list-filter-model"]').should("be.visible");
  });

  it("should maintain functionality across screen sizes", () => {
    const viewports = [
      { width: 768, height: 1024, name: "ipad-2" },
      { width: 1280, height: 800, name: "macbook-13" },
      { width: 1536, height: 960, name: "macbook-16" },
    ];

    viewports.forEach((viewport) => {
      cy.viewport(viewport.width, viewport.height);
      cy.visit("/");

      cy.get('[data-testid="list-view"]').should("exist");
      cy.get('[data-testid="list-row"]').should("have.length", GATEWAY_COUNT);

      cy.get('[data-testid="list-sort-last-message"]').click();
      cy.wait(200);
      cy.get('[data-testid="list-row"]').first().should("exist");

      cy.get('[data-testid="list-filter-status"]').click();
      cy.wait(200);
      cy.get('[data-testid="list-filter-dropdown"]').contains("ACTIVE").click();
      cy.wait(200);
      cy.get('[data-testid="list-row"]').should("have.length", ACTIVE_COUNT);

      cy.get('[data-testid="list-filter-reset"]').click();
      cy.wait(200);
      cy.get('[data-testid="list-row"]').should("have.length", GATEWAY_COUNT);
    });
  });

  it("should handle text truncation correctly", () => {
    cy.viewport("macbook-13");
    cy.visit("/");
    cy.wait(200);

    cy.get('[data-testid="list-row"]')
      .first()
      .find("td")
      .eq(0)
      .invoke("text")
      .should("have.length.at.most", 40);

    cy.get('[data-testid="list-row"]')
      .first()
      .find("td")
      .eq(3)
      .invoke("text")
      .should("have.length.at.most", 32);

    cy.get('[data-testid="list-row"]')
      .first()
      .find("td")
      .eq(6)
      .invoke("text")
      .should("have.length.at.most", 40);
  });
});
