#!/bin/bash

echo "Cleaning previous auth state..."
rm -f auth.json

echo "Running Register + Login (and save state)..."
npx playwright test tests/example.spec.ts -g "Register \+ Login \(and save state\)"

if [ $? -ne 0 ]; then
  echo "❌ Register + Login test failed. Aborting."
  exit 1
fi

echo "✅ Login successful. Running all other tests..."
npx playwright test tests/example.spec.ts --grep-invert "Register + Login"
echo "✅ All done!"

