import { connect } from 'react-redux';
import './index.css'
import TransInput from './Input';
import parseTransactions from '../../state/sagas/parseTransactions';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  parseCsv: parseTransactions
};

export default connect(mapStateToProps, mapDispatchToProps)(TransInput);
