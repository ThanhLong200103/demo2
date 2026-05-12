import HeaderComponent from './component/HeaderComponent'
import SideBarComonent from './component/SideBarComonent'
import RouterApp from './router/router'
function App() {
  return (
    <div className="admin-layout">
      <HeaderComponent />
      <SideBarComonent />
      <main 
        className="content-area" 
        style={{ 
          position: 'absolute', 
          top: '64px', 
          right: 0, 
          width: '75%', 
          height: 'calc(100vh - 64px)', 
          overflowY: 'auto', 
          padding: '20px',
        }}
      >
        <RouterApp />
      </main>
    </div>
  )
}

export default App
