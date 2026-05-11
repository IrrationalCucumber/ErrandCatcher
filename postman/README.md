# Errand Catcher - API Testing

## Overview
This folder contains the Postman collection and environment 
for API testing the Errand Catcher system.

## Requirements
- [Postman](https://www.postman.com/downloads/)
- [Newman](https://www.npmjs.com/package/newman)
- Node.js v20
- Backend running on `http://localhost:8800`
- MySQL running locally

## Files
- `errandcatcher-collection.json` - Postman collection
- `errandcatcher-environment.json` - Postman environment

## How to Import in Postman
1. Open Postman
2. Click **Import**
3. Select `errandcatcher-collection.json`
4. Select `errandcatcher-environment.json`
5. Update environment variables with your credentials

## How to Run with Newman
Install Newman:
```bash
npm install -g newman newman-reporter-htmlextra
```

Run tests:
```bash
newman run errandcatcher-collection.json -e errandcatcher-environment.json -r htmlextra
```

## Test Coverage
- Sign Up / Sign In
- Post Errand
- Apply Errand
- Accept / Deny Application
- Complete Errand
- Transaction
- Rating

## Notes
- All test data is fake/dummy data
- Tests are designed for local environment only
- Make sure backend server is running before testing
