import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import { faker } from "@faker-js/faker";
import { argosScreenshot } from "@argos-ci/playwright";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await argosScreenshot(page, "initial page load");
});

test("navigate to form page @smoke @regression", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutsPage();
  await argosScreenshot(page, "form layouts navigation");

  await pm.navigateTo().datepickerPage();
  await argosScreenshot(page, "datepicker navigation");

  await pm.navigateTo().smartTablePage();
  await argosScreenshot(page, "smart table navigation");

  await pm.navigateTo().toastrPage();
  await argosScreenshot(page, "toastr navigation");

  await pm.navigateTo().tooltipPage();
  await argosScreenshot(page, "tooltip navigation");
});

test("parametrized methods @smoke", async ({ page }) => {
  const pm = new PageManager(page);
  const randomFullName = faker.person.fullName();
  const randomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(
    1000
  )}@test.com`;

  await pm.navigateTo().formLayoutsPage();
  await argosScreenshot(page, "before grid form submission");

  await pm
    .onFormLayoutsPage()
    .submitUsingTheGrigdFormWithCredentialsAndSelectOption(
      process.env.USERNAME,
      process.env.PASSWORD,
      "Option 2"
    );
  await argosScreenshot(page, "after grid form submission");

  await pm
    .onFormLayoutsPage()
    .sumbitInlineFormWithNameEmailAndCheckbox(
      randomFullName,
      randomEmail,
      false
    );
  await argosScreenshot(page, "after inline form submission");

  await pm.navigateTo().datepickerPage();
  await argosScreenshot(page, "before datepicker selection");

  await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10);
  await argosScreenshot(page, "after common datepicker selection");

  await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 10);
  await argosScreenshot(page, "after range datepicker selection");
});

test("testing with argos ci", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutsPage();
  await argosScreenshot(page, "form layouts page");
  await pm.navigateTo().datepickerPage();
  await argosScreenshot(page, "datepicker page");
});
