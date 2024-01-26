import React, { useState } from 'react'
import './SmartBanner.css'
import { useCssHandles } from 'vtex.css-handles'
import { Helmet, canUseDOM } from 'vtex.render-runtime'
import { Image } from 'vtex.store-image'

import { isSafari } from './utils/device'
import { getCookie, setCookie } from './utils/cookies'
import { SMART_BANNER_DEFAULT_PROPS, schemaSmartBanner } from './schema'
import type { SmartBannerProps } from './typings'

const CSS_HANDLES = [
  'smartBanner',
  'smartBanner__closeButton',
  'smartBanner__image',
  'smartBanner__textContent',
  'smartBanner__title',
  'smartBanner__subtitle',
  'smartBanner__callToActionButton',
] as const

const SmartBanner: StorefrontFunctionComponent<SmartBannerProps> = ({
  iOSAppID,
  iOSAppUrl,
  androidAppUrl,
  imageUrl,
  title,
  subtitle,
  callToActionButtonText,
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)
  const smartBannerCookieName = 'smart-banner'
  const hasSmartBannerCookie = Boolean(getCookie(smartBannerCookieName))
  const [isClosed, setIsClosed] = useState(hasSmartBannerCookie)

  const handleCloseButtonClick = () => {
    setIsClosed(true)

    setCookie({
      name: smartBannerCookieName,
      value: 'closed',
      expires: { days: 1 },
    })
  }

  const handleCallToActionButtonClick = () => {
    const url = isSafari() ? iOSAppUrl : androidAppUrl

    window?.open(url, '_blank')

    setIsClosed(true)

    setCookie({
      name: smartBannerCookieName,
      value: 'closed',
      expires: { days: 30 },
    })
  }

  if (!canUseDOM) {
    return null
  }

  if (isSafari()) {
    return (
      <Helmet>
        <meta name="apple-itunes-app" content={`app-id=${iOSAppID}`} />
      </Helmet>
    )
  }

  if (hasSmartBannerCookie || isClosed) {
    return null
  }

  return (
    <section className={handles.smartBanner}>
      <button
        className={handles.smartBanner__closeButton}
        onClick={handleCloseButtonClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
        >
          <path
            d="M9 1L1 9M1 1L9 9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className={handles.smartBanner__image}>
        <Image
          src={imageUrl}
          alt={title}
          width={56}
          height={56}
          loading="lazy"
          preload
        />
      </div>
      <div className={handles.smartBanner__textContent}>
        <h2 className={handles.smartBanner__title}>{title}</h2>
        <p className={handles.smartBanner__subtitle}>{subtitle}</p>
      </div>
      <button
        className={handles.smartBanner__callToActionButton}
        onClick={handleCallToActionButtonClick}
      >
        {callToActionButtonText}
      </button>
    </section>
  )
}

SmartBanner.defaultProps = SMART_BANNER_DEFAULT_PROPS
SmartBanner.schema = schemaSmartBanner

export default SmartBanner
