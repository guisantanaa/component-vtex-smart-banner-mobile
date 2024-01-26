export function isSafari(): boolean | null {
  const userAgent = navigator?.userAgent
  console.log(userAgent, 'UserAgent: ')

  const safariRegex = /Safari/i

  if (!userAgent) {
    return null
  }

  return safariRegex.test(userAgent) && !/Chrome/i.test(userAgent)
}

// Function to check if you are in a WebView on Android or iOS
export function isWebView(): boolean | null {
  const userAgent = navigator?.userAgent

  if (!userAgent) {
    return null
  }

  const androidRegex = /Android/i
  const androidWebViewRegex = /wv/i
  const iosRegex = /iPhone|iPad|iPod/i
  const iosWebViewRegex = /AppleWebKit/i
  const safariRegex = /Safari/i

  if (androidRegex.test(userAgent)) {
    return androidWebViewRegex.test(userAgent) // WebView on Android
  }

  if (iosRegex.test(userAgent)) {
    return !safariRegex.test(userAgent) || iosWebViewRegex.test(userAgent) // WebView on iOS (excluding Safari)
  }

  return false
}