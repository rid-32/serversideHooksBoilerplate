// import { LOCALE, TOKEN } from '../constants'

/**
 * @param {object} req
 * функция получения дефолтной локали. Приоритет выбора локали следующий:
 * 1. Смотрим, была ли передана кука локали
 * 2. Если нет, то смотрим на HTTP-заголовок Accept-Language
 * 3. Если и его нет, то установливаем русскую локаль
 */
// const getLocaleFromHeaderOrCookie = async req => {
//   const localeFromHeader = req.acceptsLanguages(...Object.keys(locales))
//   const localeFromCookie = req.universalCookies.get(LOCALE)
//
//   return localeFromCookie || localeFromHeader || 'ru'
// }

// const getTokenFromCookie = req => req.universalCookies.get(TOKEN) || null

export const handleApplication = async (req, res) => {
  // const defaultLocale = await getLocaleFromHeaderOrCookie(req)
  // const token = getTokenFromCookie(req)

  try {
    // функцию рендера приложения в строку с разметкой промисифицирована.
    // промис реджектится, если приложение изменило текущий роут. это значит,
    // что мы должны сказать браузеру сделать редирект на этот роут
    const {
      applicationMarkup,
      initialState,
    } = await req.renderApplicationToString({
      url: req.url,
      // token,
      // locale: defaultLocale,
      // apiUrl: API_URL,
    })

    // устанавливаем cookie с локалью
    // req.universalCookies.set(LOCALE, defaultLocale, {
    // no expires
    //   expires: new Date(253402300000000),
    // })

    // рендерим шаблон страницы и передаём в него значения
    res.render('application', {
      applicationMarkup,
      initialState: JSON.stringify(initialState),
      stylesSource: req.stylesSource,
      scriptSource: req.scriptSource,
    })
  } catch (urlForRedirect) {
    console.info(
      `Redirect initiated by the react application to ${urlForRedirect}`,
    )

    res.redirect(302, urlForRedirect)
  }
}
