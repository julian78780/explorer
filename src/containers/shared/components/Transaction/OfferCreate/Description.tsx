import { useTranslation, Trans } from 'react-i18next'
import { localizeDate } from '../../../utils'
import {
  DATE_OPTIONS,
  CURRENCY_ORDER,
  XRP_BASE,
} from '../../../transactionUtils'
import { Account } from '../../Account'
import {
  TransactionDescriptionComponent,
  TransactionDescriptionProps,
} from '../types'
import { convertRippleDate } from '../../../../../rippled/lib/utils'
import Currency from '../../Currency'
import { Amount } from '../../Amount'
import { formatAmount } from '../../../../../rippled/lib/txSummary/formatAmount'

const normalize = (amount: any) => amount.value || amount / XRP_BASE

const Description: TransactionDescriptionComponent = (
  props: TransactionDescriptionProps,
) => {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage
  const { data } = props
  const paysCurrency = data.tx.TakerPays.currency || 'XRP'
  const getsCurrency = data.tx.TakerGets.currency || 'XRP'
  const paysValue = normalize(data.tx.TakerPays)
  const getsValue = normalize(data.tx.TakerGets)
  const invert =
    CURRENCY_ORDER.indexOf(getsCurrency) > CURRENCY_ORDER.indexOf(paysCurrency)

  let rate = getsValue / paysValue
  let pair

  if (invert) {
    rate = 1 / rate
    pair = (
      <small>
        <Currency
          currency={data.tx.TakerGets.currency || 'XRP'}
          issuer={data.tx.TakerGets.issuer}
          displaySymbol={false}
        />
        /
        <Currency
          currency={data.tx.TakerPays.currency || 'XRP'}
          issuer={data.tx.TakerPays.issuer}
          displaySymbol={false}
        />
      </small>
    )
  } else {
    pair = (
      <small>
        <Currency
          currency={data.tx.TakerPays.currency}
          issuer={data.tx.TakerPays.issuer}
        />
        /
        <Currency
          currency={data.tx.TakerGets.currency}
          issuer={data.tx.TakerGets.issuer}
        />
      </small>
    )
  }

  const renderLine4 = () => {
    const unixT = convertRippleDate(data.tx.Expiration)
    const today = new Date()
    const transString =
      unixT - today.getTime() > 0
        ? 'offer_will_expire_desc'
        : 'offer_did_expire_desc'
    const date = `${localizeDate(unixT, language, DATE_OPTIONS)} ${
      DATE_OPTIONS.timeZone
    }`

    return (
      <Trans key="line4" i18nKey={transString}>
        The offer expires
        <span className="time">{date}</span>
        unless cancelled before
      </Trans>
    )
  }

  return (
    <>
      <div key="line1">
        <Trans i18nKey="offer_create_desc_line_1">
          The account
          <Account account={data.tx.Account} />
          offered to pay
          <b>
            <Amount value={formatAmount(data.tx.TakerGets)} />
          </b>
          in order to receive
          <b>
            <Amount value={formatAmount(data.tx.TakerPays)} />
          </b>
        </Trans>
      </div>
      <div key="line2">
        {t('offer_create_desc_line_2')}
        <b>
          <span> {rate.toPrecision(5)}</span>
          {pair}
        </b>
      </div>
      {data.tx.OfferSequence && (
        <div key="line3">
          {t('offer_create_desc_line_3')}
          <b> {data.tx.OfferSequence}</b>
        </div>
      )}
      {data.tx.Expiration && renderLine4()}
    </>
  )
}

export { Description }
