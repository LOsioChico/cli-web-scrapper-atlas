# CLI Web Scraper - Reality Realty PR

A command-line web scraper built with Node.js and Puppeteer that extracts property listings from realityrealtypr.com.

## Prerequisites

- Node.js (v20 or higher)
- npm

## Installation

```bash
# Clone the repository
git clone https://github.com/LOsioChico/cli-web-scrapper-atlas.git

# Install dependencies
npm install
```

## Usage

```bash
node app.js <HOUSE|APARTMENT> <PAGE_NUMBER> <OUTPUT_FILE>
```

### Parameters:

- `HOUSE|APARTMENT`: Type of property to search for
- `PAGE_NUMBER`: Page number (starts from 0)
- `OUTPUT_FILE`: Name of the output JSON file

### Example:

```bash
# Scrape first page of apartments
node app.js APARTMENT 0 data.json

# Scrape second page of houses
node app.js HOUSE 1 houses.json
```

## Output Format

The script generates a JSON file containing an array of property objects with the following structure:

```json
{
  "url": "Property URL",
  "title": "Property Title",
  "city": "City Name",
  "price": "Price",
  "description": "Property Description",
  "images": ["Array of image URLs"],
  "flyer": "Flyer URL"
}
```

## Dependencies

- puppeteer: For web scraping and browser automation
