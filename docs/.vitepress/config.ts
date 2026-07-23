import { defineConfig } from "vitepress";

// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
  lang: "en-US",
  title: "CloudPirates Developer Portal",
  description:
    "The CloudPirates Developer Portal provides developers with the resources they need to integrate our products into their own applications using our API.",
  cleanUrls: true,
  sitemap: {
    hostname: "https://developer.cloudpirates.io",
  },
  themeConfig: {
    siteTitle: "Developer Portal",
    search: {
      provider: "local",
    },
    logo: {
      dark: "/logo-white.svg",
      light: "/logo.svg",
    },
    nav: [
      { text: "Website", link: "https://www.cloudpirates.io" },
      { text: "Customer Portal", link: "https://portal.cloudpirates.io" },
    ],

    sidebar: [
      {
        text: "CloudPirates API",
        items: [
          { text: "Quick Start", link: "/api/" },
          { text: "Error Handling", link: "/api/error-handling" },
          { text: "Pagination", link: "/api/pagination" },
        ],
      },
      {
        text: "Authentication",
        items: [
          { text: "Overview", link: "/authentication/" },
          { text: "Password", link: "/authentication/password" },
          { text: "Multi-Factor (MFA)", link: "/authentication/mfa" },
          { text: "Passkeys (WebAuthn)", link: "/authentication/webauthn" },
          { text: "API Keys", link: "/authentication/api-keys" },
          { text: "Session Management", link: "/authentication/sessions" },
        ],
      },
      {
        text: "Workspaces",
        items: [
          { text: "Overview", link: "/workspaces/" },
          {
            text: "Creating Workspaces",
            link: "/workspaces/creating-workspaces",
          },
          { text: "Members and Roles", link: "/workspaces/members-and-roles" },
          {
            text: "Managing Workspaces",
            link: "/workspaces/managing-workspaces",
          },
          { text: "Workspace Billing", link: "/workspaces/billing" },
        ],
      },
      {
        text: "Managed Services",
        items: [{ text: "Overview", link: "/managed-services/" }],
      },
      {
        text: "Managed Observability",
        items: [
          { text: "Overview", link: "/managed-observability/" },
          {
            text: "Setup Instructions",
            link: "/managed-observability/setup-instructions",
          },
          {
            text: "Cluster Resource Explorer",
            link: "/managed-observability/kubernetes-resources",
          },
          {
            text: "Performance Insights",
            link: "/managed-observability/monitoring-metrics",
          },
          {
            text: "Events & Troubleshooting",
            link: "/managed-observability/events-logs",
          },
          {
            text: "Security & Best Practices",
            link: "/managed-observability/best-practices",
          },
          {
            text: "Container Vulnerability Scanning",
            link: "/managed-observability/cve-scans",
          },
          {
            text: "Alert Reference",
            link: "/managed-observability/alert-reference",
          },
        ],
      },
      {
        text: "Managed Application Platform",
        items: [
          { text: "Overview", link: "/managed-application-plattform/" },
          {
            text: "GitOps Setup",
            link: "/managed-application-plattform/gitops-setup",
          },
          {
            text: "Deployment Options",
            link: "/managed-application-plattform/deployment-options",
          },
          {
            text: "Application Templates",
            link: "/managed-application-plattform/templates",
          },
          {
            text: "Update Management",
            link: "/managed-application-plattform/update-management",
          },
        ],
      },
      {
        text: "Billing",
        items: [
          { text: "Overview", link: "/billing/" },
          { text: "Billing Profiles", link: "/billing/billing-profiles" },
          { text: "Invoices", link: "/billing/invoices" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/CloudPirates-io" },
      { icon: "discord", link: "https://discord.gg/XUn9Kt5dsy" },
    ],

    editLink: {
      pattern:
        "https://github.com/CloudPirates-io/developer-portal/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },

    lastUpdated: {
      text: "Updated at",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },

    footer: {
      copyright: "Copyright © 2025 CloudPirates GmbH & Co. KG",
    },
  },
});
