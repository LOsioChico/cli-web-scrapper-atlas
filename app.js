import puppeteer from "puppeteer";
import fs from "fs/promises";

const BASE_URL = "https://www.realityrealtypr.com";

async function main() {
  const [propertyType, pageNum, outputFile] = process.argv.slice(2);

  if (!propertyType || !outputFile) {
    console.error("Usage: node app.js <HOUSE|APARTMENT> <PAGE_NUMBER> <OUTPUT_FILE>");
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1920, height: 1080 },
    timeout: 30000,
  });

  try {
    const page = await browser.newPage();
    const properties = await scrapeProperties(propertyType, page, parseInt(pageNum));
    await fs.writeFile(outputFile, JSON.stringify(properties, null, 2));
    console.log(`Results saved to ${outputFile}`);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

async function scrapeProperties(propertyType, page, pageNum) {
  try {
    const searchUrl = new URL("/propiedades/venta/", BASE_URL);
    searchUrl.searchParams.append("search[property_type]", getPropertyTypeParam(propertyType));

    if (pageNum > 0) {
      searchUrl.searchParams.append("page", pageNum);
    }

    await page.goto(searchUrl.toString(), { waitUntil: "networkidle0" });

    const propertyUrls = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".results > .row > div > :last-child > a:first-child"))
        .map((a) => a.href)
        .filter((url) => url.includes("/compra-venta/")),
    );

    return Promise.all(propertyUrls.map((url) => scrapePropertyDetails(page, url)));
  } catch (error) {
    console.error("Error scraping properties:", error);
    throw error;
  }
}

async function scrapePropertyDetails(page, propertyUrl) {
  await page.goto(propertyUrl, { waitUntil: "networkidle0" });

  const property = await page.evaluate(() => {
    const title = document.querySelector("h1")?.textContent?.trim();
    const city = document.querySelector("#top-content > .content > :nth-child(2) > div > p")?.textContent?.trim();
    const price = document.querySelector("h3.sale-rent-title")?.textContent?.trim().replace(/\s+/g, " ");
    const description = document.querySelector("#home")?.textContent?.trim();

    const images = Array.from(document.querySelectorAll("#carousel > .carousel-inner > .item > img"))
      .map((img) => img.src)
      .filter((src) => src);

    const brokerId = document.querySelector('[name="broker_id"]')?.value;
    const propertyId = window.location.pathname.split("/").at(-2);

    return {
      url: window.location.href.split("?")[0],
      title,
      city,
      price,
      description,
      images,
      flyer: `${window.location.origin}/properties/print/id:${propertyId}/broker_id:${brokerId}/`,
    };
  });

  return property;
}

const getPropertyTypeParam = (type) => {
  return type === "APARTMENT" ? "Residential:5" : "Residential:1";
};

main();
