import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import './App.css';
import Header from '../Components/Header';
import Customer from "../pages/customer/Customer";
import Footer from '../Components/Footer';



const theme=createTheme({
  palette:{
    primary:{
      light:"#607f8a",
      main:"#0f0f0f"
    },
    secondary:{
      main:"#fff",
      light:"#f8324526"
    }
  }
})
function App() {
  return (
    <ThemeProvider theme={theme}>
    <Header/>
    <Customer/>
    <Footer/>
    <CssBaseline/>
    </ThemeProvider>
  );
}

export default App;
