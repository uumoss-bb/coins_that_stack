import { connect } from 'react-redux';
import './index.css'
import TransInput from './Input';
import { setTransactions, normalizeGroupsAndTrans } from '../../state/actions'

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  setTransactions,
  normalizeGroupsAndTrans
};

export default connect(mapStateToProps, mapDispatchToProps)(TransInput);
