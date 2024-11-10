import type { Meta, StoryObj } from '@storybook/vue3'
import Login from '@/components/LoginPage.vue'
import { createPinia } from 'pinia'
import { useLogInStore } from '@/stores/loginStore'

const pinia = createPinia()

const meta: Meta<typeof Login> = {
  title: 'Components/Login',
  component: Login,
  decorators: [
    () => ({
      template: '<div class="login-wrapper"><story/></div>',
      setup() {
        const store = useLogInStore()
        return { store }
      }
    })
  ],
  parameters: {
    pinia: pinia,
    // Add documentation
    docs: {
      description: {
        component: 'Login component that handles user authentication using email and password.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof Login>

// Default state
export const Default: Story = {
  render: () => ({
    components: { Login },
    template: '<Login />',
    setup() {
      const store = useLogInStore()
      store.$reset()
      return { store }
    }
  })
}

// With Error Message
export const WithError: Story = {
  render: () => ({
    components: { Login },
    template: '<Login />',
    setup() {
      const store = useLogInStore()
      // Set error message
      store.$patch({
        errMsg: 'Invalid email or password'
      })
      return { store }
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Shows how the login form displays error messages.'
      }
    }
  }
}

// With Pre-filled Email
export const PrefilledEmail: Story = {
  render: () => ({
    components: { Login },
    template: '<Login />',
    setup() {
      const store = useLogInStore()
      store.$patch({
        email: 'test@example.com'
      })
      return { store }
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Login form with a pre-filled email address.'
      }
    }
  }
}

// Mock Successful Login
export const SuccessfulLogin: Story = {
  render: () => ({
    components: { Login },
    template: '<Login />',
    setup() {
      const store = useLogInStore()
      
      // Mock successful login
      store.loginUser = async () => {
        store.errMsg = ''
        store.email = 'test@example.com'
        store.password = 'password123'
        console.log('Login successful with:', {
          email: store.email,
          password: store.password
        })
      }
      
      return { store }
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates a successful login attempt.'
      }
    }
  }
}

// Mock Failed Login
export const FailedLogin: Story = {
  render: () => ({
    components: { Login },
    template: '<Login />',
    setup() {
      const store = useLogInStore()
      
      // Mock failed login
      store.loginUser = async () => {
        store.errMsg = 'Invalid credentials'
        console.log('Login failed')
      }
      
      return { store }
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates a failed login attempt with error message.'
      }
    }
  }
}

// Mock Email Validation
export const EmailValidation: Story = {
  render: () => ({
    components: { Login },
    template: '<Login />',
    setup() {
      const store = useLogInStore()
      
      store.loginUser = async () => {
        if (!store.email.includes('@')) {
          store.errMsg = 'Please enter a valid email address'
          return
        }
        if (!store.password) {
          store.errMsg = 'Password is required'
          return
        }
        store.errMsg = ''
        console.log('Form validation passed')
      }
      
      return { store }
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Shows form validation for email format and required fields.'
      }
    }
  }
}