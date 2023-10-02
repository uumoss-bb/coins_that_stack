import * as React from 'react';
import { connect } from 'react-redux';
import './index.css'
import TransInput from './Input';

const TransInputIndex = () => {
  const [csv, setCsv] = React.useState("");
  const [source, setSource] = React.useState([
    { label: "Elevations", id: "#F0F8FF" }
  ]);

  return (
    <div className='TransInput'>
      <TransInput 
        csv={csv} setCsv={setCsv} 
        source={source} setSource={setSource}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TransInputIndex);
