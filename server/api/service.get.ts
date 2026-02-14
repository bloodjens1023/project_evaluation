export default defineEventHandler(() => {
  return {
    jumpOut: 1,
    customerButtons: [
      { title: "WhatsApp Support", url: "https://wa.me/123456789" },
      { title: "Live Chat", url: "https://example.com/live-chat" },
      { title: "Telegram", url: "https://t.me/example_support" },
    ],
  }
})
