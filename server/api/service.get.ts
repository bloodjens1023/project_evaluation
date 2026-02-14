export default defineEventHandler(() => {

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        jumpOut: 1,
        customerButtons: [
          { title: "WhatsApp Support", url: "https://wa.me/123456789" },
          { title: "Live Chat", url: "https://example.com/live-chat" },
          { title: "Telegram", url: "https://t.me/example_support" },
        ],
      })
    }, 1000) // this is just for test
  })
})
