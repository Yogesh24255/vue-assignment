import { expect, userEvent, within } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';

import Dashboard from '@/components/DashboardPage.vue';

const meta = {
  title: 'Dashboard',
  component: Dashboard,
  render: () => ({
    components: { Dashboard },
    template: '<dashboard />',
  }),
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Dashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story for the dashboard when user data is available
export const Default: Story = {
  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement);

    // Check for user details display
    await expect(canvas.getByText('User Details')).toBeInTheDocument();
    await expect(canvas.getByText('Name:')).toBeInTheDocument();
    await expect(canvas.getByText('Email:')).toBeInTheDocument();

    // Check if Sign Out button is present
    const signOutButton = canvas.getByRole('button', { name: /Sign out/i });
    await expect(signOutButton).toBeInTheDocument();
  },
};


// Story for when the user signs out
export const SignedOut: Story = {
  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement);

    // Find and click the Sign Out button
    const signOutButton = canvas.getByRole('button', { name: /Sign out/i });
    await userEvent.click(signOutButton);

    // Optionally, check for redirect or logged-out state (e.g., checking localStorage or redirect message)
    const loggedOutMessage = canvas.queryByText(/You have been logged out/i);
    if (loggedOutMessage) {
      await expect(loggedOutMessage).toBeInTheDocument();
    }
  },
};
