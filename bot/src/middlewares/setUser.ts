import { Middleware } from "grammy"

import { IUser, User } from "common/database"
import { convertChars } from "common/utils"
import { Context } from "@typings/context"

export default (): Middleware<Context> => async (ctx, next) => {
  let user = await User.findOne({ id: ctx.from.id })

  if (!user) user = new User({ from: ctx.message.text, id: ctx.from.id })

  user = Object.assign(user, {
    languageCode: ctx.from.language_code,
    lastMessage: Date.now(),
    name: `${convertChars(ctx.from.first_name)} ${convertChars(
      ctx.from.last_name ?? ""
    )}`,
    username: ctx.from.username
  } as unknown as IUser)

  ctx.session.user = user

  ctx.i18n.useLocale(
    ctx.session.user.lang || ctx.session.user.languageCode || "en"
  )

  await next()

  return user.save()
}
