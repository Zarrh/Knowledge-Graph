// import './Introduction.css'
import React from 'react'
import { nodes, edges, subjectNames } from '../data'

const Explanation = ({ setPage }) => {
  return (
    <div style={{
      height: '101vh',
      width: '101vw',
      alignContent: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
      marginLeft: '-1vw',
      marginTop: '-1vh',
      display: 'block',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 84,
      }}>
        The symbols:
      </div>
      <div style={{
        marginTop: '5vh',
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: '16rem',
        rowGap: '2rem',
        fontSize: 26,
        maxHeight: '60%',
      }}>
        <div>
          <div style={{fontSize: 88, fontFamily: 'sans', color: '#ae00ff'}}>τ</div>
          <div style={{height: '4px', width: 'auto', background: 'linear-gradient(0.25turn, #ae00ff, #ff7ecb)', marginBottom: '1rem', borderRadius: '20px'}}></div>
          <div style={{fontSize: 28}}>Theory</div>
        </div>
        <div>
          <div style={{fontSize: 88, fontFamily: 'sans', color: '#ae00ff'}}>α</div>
          <div style={{height: '4px', width: 'auto', background: 'linear-gradient(0.25turn, #ae00ff, #ff7ecb)', marginBottom: '1rem', borderRadius: '20px'}}></div>
          <div style={{fontSize: 28}}>Author or leader</div>
        </div>
        <div>
          <div style={{fontSize: 88, fontFamily: 'sans', color: '#ae00ff'}}>ο</div>
          <div style={{height: '4px', width: 'auto', background: 'linear-gradient(0.25turn, #ae00ff, #ff7ecb)', marginBottom: '1rem', borderRadius: '20px'}}></div>
          <div style={{fontSize: 28}}>Literary work</div>
        </div>
        <div>
          <div style={{fontSize: 88, fontFamily: 'sans', color: '#ae00ff'}}>μ</div>
          <div style={{height: '4px', width: 'auto', background: 'linear-gradient(0.25turn, #ae00ff, #ff7ecb)', marginBottom: '1rem', borderRadius: '20px'}}></div>
          <div style={{fontSize: 28}}>Movement</div>
        </div>
        <div>
          <div style={{fontSize: 88, fontFamily: 'sans', color: '#ae00ff'}}>ι</div>
          <div style={{height: '4px', width: 'auto', background: 'linear-gradient(0.25turn, #ae00ff, #ff7ecb)', marginBottom: '1rem', borderRadius: '20px'}}></div>
          <div style={{fontSize: 28}}>Idea</div>
        </div>
        <div>
          <div style={{fontSize: 88, fontFamily: 'sans', color: '#ae00ff'}}>ς</div>
          <div style={{height: '4px', width: 'auto', background: 'linear-gradient(0.25turn, #ae00ff, #ff7ecb)', marginBottom: '1rem', borderRadius: '20px'}}></div>
          <div style={{fontSize: 28}}>Generic</div>
        </div>
      </div>
      <div style={{
        marginTop: '5vh',
        width: '35%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '2rem',
      }}>
        <button className='start-btn' onClick={() => setPage('subjects-slide')}>
          <span></span>
          <span></span>
          <span></span>
          <span></span> Next
        </button>
        <button className='skip-btn' onClick={() => setPage('home')}> 
          Skip introduction
        </button>
      </div>
      {/* <GlassBall x={-100} y={-100} radius={300} from={'#ff7ecb'} to={'#6a00f4'} />
      <GlassBall x={-100} y={-100} rev={true} radius={300} from={'#ff7ecb'} to={'#6a00f4'} /> */}
    </div>
  )
}

export default Explanation