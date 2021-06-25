import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { translate } from 'react-i18next';

import { analytics, ANALYTIC_TYPES } from '../shared/utils';
import Log from '../shared/log';
import TokensHeader from './TokensHeader';
import TokensTable from './TokensTable';
import TokensFooter from './TokensFooter';
import './styles.css';

const TOP_TOKENS_URL = '/api/v1/token/top';

const Tokens = props => {
  const [allTokens, setAllTokens] = useState([]);
  const [updatedTime, setUpdatedTime] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  document.title = `${props.t('xrpl_explorer')} | ${props.t('tokens')}`;

  useEffect(() => {
    axios
      .get(TOP_TOKENS_URL)
      .then(res => {
        const { tokens, updated } = res.data;
        setAllTokens(tokens);
        setUpdatedTime(updated);
        setIsLoading(false);
      })
      .catch(error => {
        Log.error(`${TOP_TOKENS_URL} --- ${JSON.stringify(error)}`);

        analytics(ANALYTIC_TYPES.exception, {
          exDescription: `${TOP_TOKENS_URL} --- ${JSON.stringify(error)}`
        });

        setUpdatedTime(NaN);
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  return props.error ? (
    Tokens.renderError(props.error)
  ) : (
    <div className="token-discovery-page">
      <TokensHeader tokens={allTokens} isLoading={isLoading} isError={isError} />
      <TokensTable allTokens={allTokens} isError={isError} />
      <TokensFooter updated={updatedTime} isLoading={isLoading} isError={isError} />
    </div>
  );
};

Tokens.propTypes = {
  t: PropTypes.func.isRequired,
  error: PropTypes.number
};

Tokens.defaultProps = {
  error: null
};

export default translate()(Tokens);
