import { BrowserRouter as Router } from 'react-router-dom'
import { mount } from 'enzyme'
import { I18nextProvider } from 'react-i18next'
import { Simple as NFTokenCancelOffer } from '../Simple'
import transaction from './mock_data/NFTokenCancelOffer.json'
import summarizeTransaction from '../../../../../../rippled/lib/txSummary'
import i18n from '../../../../../../i18n/testConfig'

describe('NFTokenCancelOffer', () => {
  it.only('handles NFTokenCancelOffer simple view ', () => {
    const screen = mount(
      <I18nextProvider i18n={i18n}>
        <Router>
          <NFTokenCancelOffer
            data={summarizeTransaction(transaction, true).details}
          />
        </Router>
      </I18nextProvider>,
    )
    expect(screen.getByTestId('token-id')).toHaveTextContent(
      '000800006203F49C21D5D6E022CB16DE3538F248662FC73C258BA1B200000018',
    )
    expect(screen.getByTestId('offer-id')).toHaveTextContent(
      '35F3D6D99548FA5F5315580FBF8BA6B15CAA2CAE93023D5CE4FDC130602BC5C3',
    )
    expect(screen.getByTestId('amount')).toHaveTextContent(
      '$100.00 USD.r9AExd6v3keXaXa3nXAMHHcP9nWy9Aef2g',
    )
    expect(screen.getByTestId('offerer')).toHaveTextContent(
      'r9AExd6v3keXaXa3nXAMHHcP9nWy9Aef2g',
    )
  })
})
