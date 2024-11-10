import { expect, userEvent, within } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';

import LoginPage from '@/components/LoginPage.vue';


const meta = {
  title: 'LoginPage',
  component: LoginPage,
  render: () => ({
    components: { LoginPage },
    template: '<login-page />',
  }),
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wait until the login component initializes before performing interactions
export const Default: Story = {
  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement);

    // Wait for the login button to be available
    await canvas.findByRole('button', { name: /Log In/i });

    // Optionally, add an extra delay if initialization takes longer
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Now perform interactions
    const emailInput = canvas.getByPlaceholderText(/Email/i);
    const passwordInput = canvas.getByPlaceholderText(/Password/i);

    await expect(emailInput).toBeInTheDocument();
    await expect(passwordInput).toBeInTheDocument();

    await userEvent.type(emailInput, 'yogesh@abc.com');
    await userEvent.type(passwordInput, 'abcdefg');

    const loginButton = canvas.getByRole('button', { name: /Log In/i });
    await userEvent.click(loginButton);
  },
};
