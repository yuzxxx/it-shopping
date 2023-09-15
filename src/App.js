import { Container } from 'react-bootstrap';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProductAll from './page/ProductAll';
import ProductDetail from './page/ProductDetail';
import LoginPage from './page/LoginPage';
import Navbar from './component/Navbar';
import { useEffect, useState } from 'react';
import PrivateRoute from './route/PrivateRoute';

//1. 전체상품 페이지/로그인/상품상세페이지/user페이지 - src 폴더에 페이지 폴더  생성해서 작업할 페이지를 생성 / - App.js에서 Routes로 각 페이지 연결
//1-1. 네비게이션바 - 컴포넌트 - App.js에서 import해서 연결함
//1-2. 네비게이션바에서 1) 로그인영역 2) 로고영역 -> Link to로 인덱스로 가도록 연결 3) 네비게이션 영역 -> 부트스트랩에서 Navbar로 연결해볼 것을 권장.
//--> localhost:3000을 기준으로 각각의 페이지가 나오는 지 연결 테스트
//--> localhost:3000/login
//--> localhost:3000/user
//--> localhost:3000/products
//--> localhost:3000 뒤에 붙는 경로는 App.js에서 Route 속성의 path에 선언된 경로

//2. 전체 상품페이지에는 기본 상품 카드가 진열되어 있음
//npm install -g json-server
//새 터미널을 열어서 json-server --watch db.json --port 5000
//포트 번호는 3000번만 아니면 됨
//서버 연결이 되면 리소스 정보를 ctrl 누르고 클릭해서 data 정보 먼저 확인 Resources

//2-1. 전체상품 페이지에서 진열된 각 상품은 컴포넌트로 Products.js로 셍성
//---> 전체상품 페이지에서 불러와진 db.json 파일의 필드값을 카드페이지로 상속되게 함 --> Distructuring(객체분할) -> 전체 상품 페이지에서 생성한 productCard 엘리먼트를 뿌려줌

//3. 로그인 버튼을 클릭하면 로그인 페이지가 나옴
//--> 전체 페이지에서 상품카드를 클릭하면 --> 로그인 상태가 true면 상세페이지가 보이고 --> 로그인 상테가 false면 login 페이지

//3-1. 상품을 클릭했을 때 로그인 상태면 -> 상세페이지가 보이고 로그인 상태가 아니면 로그인 페이지가 보이도록 함
//--> App.js 페이지에서 기본 로그인 상태를 false로 설정 --> useState9false)
//--> PrivateRoute.js 페이지를 생성
//--> 로그인 상태가 true -> 디테일로 가고
//--> 로그인 상태가 false -> 로그인으로 가는 redirect 설정

//4. 상품 상세 페이지
//--> useParms -> id를 받아서 해당 id에 해당하는 정보를 출력
/* const ProductDetail = () => {
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const getProductDetail = async() => {
      let url = `http://localhost:5000/products/${id}`
      let response = await fetch(url);
      let data = await response.json();
      //console.log(data)
      setProduct(data)
  }

  useEffect(() => {
    getProductDetail()
  }, [])
  
  --> 각 속성들은 product.키값으로 선언해서 출력
  */

function App() {
  const [authenticate, setAuthentication] = useState(false);

/* 
  useEffect(() => {})
  - 인자로 함수를 받음 -> 콜백함수
  - Mount --> 화면에 첫 랜더링
  - Update --> 다시 랜더링
  - UnMount --> 화면에서 사라짐

  1) useEffect(() => {},[])
  -> 화면에 처음 랜더링될 때 실행 -> 빈배열값을 전달하면 화면에 첫 랜더링할 때만 실행

  2) useEffect(() => {},[value])
  --> value의 값이 바뀔 때마다 실행
*/

  useEffect(() => {
    console.log(authenticate);
  },[authenticate])
  return (
    <Container>
      <Navbar authenticate={authenticate} setAuthentication={setAuthentication}/>
      <Routes>
        <Route path='/' element={<ProductAll />} />
        {/* <Route path='/product/:id' element={<ProductDetail />} /> */}

        {/* privateRoute 설정 */}
        <Route path='/product/:id' element={<PrivateRoute authenticate={authenticate} />} />
        <Route path='login' element={<LoginPage setAuthentication={setAuthentication}/>} />
        {/* <Route path='user' element={<UserPage />} /> */}
      </Routes>
    </Container>
  );
}

export default App;