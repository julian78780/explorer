import { cleanup, screen } from '@testing-library/react'
import i18n from '../../../../../../i18n/testConfigEnglish'
import { expectSimpleRowLabel, expectSimpleRowText } from '../../test'
import { createSimpleRenderFactory } from '../../test/createRenderFactory'

import { Simple } from '../Simple'
import mockUNLModifyEnable from './mock_data/UNLModifyEnable.json'
import mockUNLModifyDisable from './mock_data/UNLModifyDisable.json'

const renderComponent = createSimpleRenderFactory(Simple, i18n)

describe('UNLModify: Simple', () => {
  afterEach(cleanup)
  it('renders tx that enables a validator', () => {
    renderComponent(mockUNLModifyEnable)
    expectSimpleRowLabel(screen, 'validator', 'Validator')
    expectSimpleRowText(
      screen,
      'validator',
      'nHUXeusfwk61c4xJPneb9Lgy7Ga6DVaVLEyB29ftUdt9k2KxD6Hw',
    )
    expectSimpleRowLabel(screen, 'action', 'action')
    expectSimpleRowText(screen, 'action', 'ENABLE')
  })

  it('renders tx that disables a validator', () => {
    renderComponent(mockUNLModifyDisable)
    expectSimpleRowLabel(screen, 'validator', 'Validator')
    expectSimpleRowText(
      screen,
      'validator',
      'nHUXeusfwk61c4xJPneb9Lgy7Ga6DVaVLEyB29ftUdt9k2KxD6Hw',
    )
    expectSimpleRowLabel(screen, 'action', 'action')
    expectSimpleRowText(screen, 'action', 'DISABLE')
  })
})
