import Image from "next/image";
import { AiOutlineUser, AiFillLock } from 'react-icons/ai';

export default function Home() {
  return (
    <div className="Home">
      <header style={{ backgroundColor: '#37cd92', color: '#fff', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }} className="logo">Gym Social</h1>
        <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }} className="nav-links">
          <li style={{ marginLeft: '20px' }}><a href="#" style={{ color: '#fff', fontSize: '18px' }}>Home</a></li>
          <li style={{ marginLeft: '20px' }}><a href="#" style={{ color: '#fff', fontSize: '18px' }}>About</a></li>
          <li style={{ marginLeft: '20px' }}><a href="#" style={{ color: '#fff', fontSize: '18px' }}>Contact</a></li>
        </ul>
      </header>
      <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 60px)', textAlign: 'center' }}>
        <div>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>Welcome to Gym Social!</h2>
          <p style={{ fontSize: '24px', lineHeight: 1.5, maxWidth: '800px', marginBottom: '40px' }}>Your go-to social network for fitness enthusiasts.</p>
          <button style={{ backgroundColor: '#37cd92', color: '#fff', fontSize: '24px', fontWeight: 'bold', padding: '20px', borderRadius: '10px', cursor: 'pointer', transition: 'all 0.3s ease' }} className="cta-btn">Sign up now</button>
        </div>
      </section>
      <footer style={{ textAlign: 'center', marginTop: '50px', color: '#999' }} className="App-footer">
        <p>&copy; 2023 Gym Social. All rights reserved.</p>
      </footer>
    </div>
  );
}


