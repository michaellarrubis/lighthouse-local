#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo '🏗️👷 Styling, Testing and Building project before committing'

# Check Prettier standards
npm run check:format ||
(
  echo 'Prettier Check Failed. Make the required changes listed above and try commit again.';
  false;
)

# Check ESLint Standards
npm run check:lint ||
(
  echo 'ESLint Check Failed. Make the required changes listed above and try to commit again.'
  false; 
)

# Check tsconfig standards
npm run check:types ||
(
  echo 'Typescript Compiling Failed: Make the changes required above and try to commit again'
  false;
)

# If everything passes... Now we can commit
echo 'All seems good. Now committing!'
