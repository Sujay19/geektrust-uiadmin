import './App.css';
import MainBody from './Components/MainBody';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="min-h-screen w-full bg-gray">
    <div className="gradient-bg-welcome">
      <Navbar/>
   </div>    
  <div className='pt-20 h-full ml-20 w-4/5 flex justify-center items-center' >
        <MainBody/>
  </div>
</div>
  );
}

export default App;
