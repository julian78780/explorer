import { Link } from 'react-router-dom'

export interface AccountProps {
  account: string
  link?: boolean
  tag?: number
}

export const Account = (props: AccountProps) => {
  const { account, link = true, tag } = props
  const parts = account.split(':')
  const computedTag = tag || parts[1]

  return (
    <>
      {link ? (
        <Link
          data-testid="account"
          className="account"
          title={parts[0]}
          to={`/accounts/${parts[0]}`}
        >
          {parts[0]}
        </Link>
      ) : (
        <span data-testid="account" className="account" title={parts[0]}>
          {parts[0]}
        </span>
      )}
      {computedTag && (
        <span className="dt" data-testid="dt">
          :{computedTag}
        </span>
      )}
    </>
  )
}
