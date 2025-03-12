import type { Preview } from '@storybook/react'

import "../src/components/closedCardView/ClosedCardView.css"; // Adjust path if needed



const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;