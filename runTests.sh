#!/bin/bash

echo "Running e2E_Tests..."
npx playwright test tests/e2E_Tests.spec.ts 

echo "Running e2E_ExtendedTests..."
npx playwright test tests/e2E_ExtendedTests.spec.ts 

echo "✅ All done!"

