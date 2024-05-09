import { cleanup, screen } from '@testing-library/react'
import i18n from '../../../../../../i18n/testConfigEnglish'

import { Description } from '../Description'
import { createDescriptionRenderFactory } from '../../test'
import mockAccountSetWithDomain from './mock_data/AccountSetWithDomain.json'
import mockAccountSetWithClearFlag from './mock_data/AccountSetWithClearFlag.json'
import mockAccountSetWithSetFlag from './mock_data/AccountSetWithSetFlag.json'
import mockAccountSetWithMessageKey from './mock_data/AccountSetWithMessageKey.json'
import mockAccountSetWithNFTokenMinter from './mock_data/AccountSetWithNFTokenMinter.json'

const renderComponent = createDescriptionRenderFactory(Description, i18n)

describe('AccountSet: Description', () => {
  afterEach(cleanup)
  it('renders tx that sets the domain', () => {
    renderComponent(mockAccountSetWithDomain)
    expect(wrapper).toHaveText('It sets the account domain as mduo13.com')
    wrapper.unmount()
  })

  it('renders tx that sets the email hash', () => {
    renderComponent({
      ...mockAccountSetWithDomain,
      tx: {
        ...mockAccountSetWithDomain.tx,
        Domain: undefined,
        EmailHash: '7AC3878BF42A5329698F468A6AAA03B9',
      },
    })
    expect(wrapper).toHaveText(
      'It sets the account email hash as 7AC3878BF42A5329698F468A6AAA03B9',
    )
    wrapper.unmount()
  })

  it('renders tx that clears a flag', () => {
    renderComponent(mockAccountSetWithClearFlag)
    expect(wrapper).toHaveText('It clears the account flag asfGlobalFreeze')
    wrapper.unmount()
  })

  it('renders tx that sets a flag', () => {
    renderComponent(mockAccountSetWithSetFlag)
    expect(wrapper).toHaveText('It sets the account flag asfRequireDest')
    wrapper.unmount()
  })

  it('renders tx that clears a flag that is not defined', () => {
    renderComponent({
      ...mockAccountSetWithClearFlag,
      tx: { ...mockAccountSetWithClearFlag.tx, ClearFlag: 45 },
    })
    expect(wrapper).toHaveText('It clears the account flag 45')
    wrapper.unmount()
  })

  it('renders tx that sets a flag that is not defined', () => {
    renderComponent({
      ...mockAccountSetWithSetFlag,
      tx: { ...mockAccountSetWithSetFlag.tx, SetFlag: 45 },
    })
    expect(wrapper).toHaveText('It sets the account flag 45')
    wrapper.unmount()
  })

  it('renders tx that sets a message', () => {
    renderComponent(mockAccountSetWithMessageKey)
    expect(wrapper.find('[data-testid="message-key"]')).toHaveText(
      'It sets the account message key as 020000000000000000000000000941C216565D33C8A8ACD1A33C359E84D652D1DA',
    )
    wrapper.unmount()
  })

  it('renders tx that sets a minter', () => {
    renderComponent(mockAccountSetWithNFTokenMinter)
    expect(wrapper.find('[data-testid="minter"]')).toHaveText(
      'It sets rXMART8usFd5kABXCayoP6ZfB35b4v43t as the authorized minter for this account',
    )
    wrapper.unmount()
  })
})
