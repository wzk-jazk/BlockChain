import React, {useEffect, useState} from 'react';
import {borrowYourCarContract,myERC20Contract,web3} from "./utils/contracts";
import InputBox from "./count";
const GanacheTestChainId = '0x539' // Ganache默认的ChainId = 0x539 = Hex(1337)
// TODO change according to your configuration
const GanacheTestChainName = 'carRent'
const GanacheTestChainRpcUrl = 'HTTP://127.0.0.1:8545'
// 模拟汽车数据
const carsData = [
  { id: 0, owner: '0xa8871B026f4D5b9B979d44aaaC03e689c82Ac78b', borrower: '', isBorrowed: false ,expireTime:0},
  { id: 1, owner: '0x13FE1E03987bf3A5D7D45E539734e2C6C153Db5A', borrower: '', isBorrowed: false ,expireTime:0},
  { id: 2, owner: '0x13FE1E03987bf3A5D7D45E539734e2C6C153Db5A', borrower: '', isBorrowed: false ,expireTime:0},
  { id: 3, owner: '0x22cA0337389f5CeBFa918e8E683f4EDFd4492Cec', borrower: '', isBorrowed: false ,expireTime:0},
  { id: 4, owner: '0x22cA0337389f5CeBFa918e8E683f4EDFd4492Cec', borrower: '', isBorrowed: false ,expireTime:0},
];

interface InputValue {
  id: number;
  value: string;
}

const App: React.FC = () => {
  const [account, setAccount] = useState('')
  const [cars, setCars] = useState(carsData);
  const [notBorrowed, setNotBorrowed] = useState<number[]>([]);
  const [accountBalance, setAccountBalance] = useState(0)
  //const [userCars, setUserCars] = useState<Car[]>([]);
  const [ownedCar,setOwnedCar] = useState<number[]>([]);
  // let ownedCar:number[] = [];


  interface Car {
    id: number;
    owner: string;
    borrower: string;
    isBorrowed: boolean;
    expireTime: number;
  }

  useEffect(() => {
    // 初始化检查用户是否已经连接钱包
    // 查看window对象里是否存在ethereum（metamask安装后注入的）对象
    const initCheckAccounts = async () => {
      // @ts-ignore
      const {ethereum} = window;
      if (Boolean(ethereum && ethereum.isMetaMask)) {
        // 尝试获取连接的用户账户
        const accounts = await web3.eth.getAccounts()
        if(accounts && accounts.length) {
          setAccount(accounts[0])
          const own = await borrowYourCarContract.methods.getOwned(accounts[0]).call();
          const tmp : number[] = own[0].slice(0, own[1]);
          setOwnedCar(tmp);
          const unBorrowed = await borrowYourCarContract.methods.getUnborrowed().call();
          const tmp1 : number[] = unBorrowed[0].slice(0,unBorrowed[1]);
          const tmps = cars;
          for(let i = 0;i < 5;i++){
            if(tmp1.indexOf(i) == -1){
              const info = await borrowYourCarContract.methods.getCarInfo(i).call();
              tmps[i].borrower = info[1];
              tmps[i].expireTime = info[2];
            }
          }
          setCars(tmps);
          setNotBorrowed(tmp1);
        }else{
          console.log("contract not exists.")
        }

      }
    }
    initCheckAccounts()
  }, [])

//获取余额，转化为标准单位
  useEffect(() => {
    const getAccountInfo = async () => {
      if (myERC20Contract) {
        const ab = await myERC20Contract.methods.balanceOf(account).call()
        setAccountBalance(web3.utils.fromWei(ab, 'ether'))
      } else {
        alert('Contract not exists.')
      }
    }

    if(account !== '') {
      getAccountInfo()
    }
  }, [account])
  //发放空投
  const onClaimTokenAirdrop = async () => {
    if(account === '') {
      alert('You have not connected wallet yet.')
      return
    }

    if (myERC20Contract) {
      try {
        await myERC20Contract.methods.airdrop().send({
          from: account
        })
      } catch (error: any) {
        alert(error.message)
      }

    } else {
      alert('Contract not exists.')
    }
  }
  const convertUnixTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); // 将秒转换为毫秒
    const year = date.getFullYear(); // 年份
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份，需要注意月份是从0开始的，所以要加1；padStart函数用于补齐两位数字
    const day = String(date.getDate()).padStart(2, '0'); // 日
    return `${year}-${month}-${day}`;
  };


  const onClickConnectWallet = async () => {
    // 查看window对象里是否存在ethereum（metamask安装后注入的）对象
    // @ts-ignore
    const {ethereum} = window;
    if (!Boolean(ethereum && ethereum.isMetaMask)) {
      alert('MetaMask is not installed!');
      return
    }
    try {
      // 如果当前小狐狸不在本地链上，切换Metamask到本地测试链
      if (ethereum.chainId !== GanacheTestChainId) {
        const chain = {
          chainId: 1337, // Chain-ID
          chainName: 'carRent', // Chain-Name
          rpcUrls: 'HTTP://127.0.0.1:8545', // RPC-URL
        };

        try {
          // 尝试切换到本地网络
          await ethereum.request({method: "wallet_switchEthereumChain", params: [{chainId: chain.chainId}]})
        } catch (switchError: any) {
          // 如果本地网络没有添加到Metamask中，添加该网络
          if (switchError.code === 4902) {
            await ethereum.request({ method: 'wallet_addEthereumChain', params: [chain]
            });
          }
        }
      }

      // 小狐狸成功切换网络了，接下来让小狐狸请求用户的授权
      await ethereum.request({method: 'eth_requestAccounts'});
      // 获取小狐狸拿到的授权用户列表
      const accounts = await ethereum.request({method: 'eth_accounts'});
      // 如果用户存在，展示其account，否则显示错误信息
      setAccount(accounts[0] || 'Not able to get accounts');
    } catch (error: any) {
      alert(error.message)
    }
  };
  interface pic{
    id:number;
  }
  const ShowPicture: React.FC<pic> = (props) =>{
    if(props.id == 0){
      return (
            <img src={require('./pics/lambor.png')} alt={"lambor1"} style={{width: '300px', height: '180px'}}/>
      )
    }else if(props.id == 1){
      return (
          <img src={require('./pics/lambor2.jpg')} alt={'lambor2'} style={{width: '300px', height: '180px'}}/>
      )
    }else if(props.id == 2){
      return (
          <img src={require('./pics/XX.jpg')} alt={'XX'} style={{width: '300px', height: '180px'}}/>
      )
    }else if(props.id == 3){
      return (
          <img src={require('./pics/audi.jpg')} alt={'audi'} style={{width: '300px', height: '180px'}}/>
      )
    }else{
      return (
          <img src={require('./pics/ae86.jpg')} alt={'ae86'} style={{width: '300px', height: '180px'}}/>
      )
    }
  };

  const UserCars: React.FC = () => {
    if (ownedCar.length === 0) {
      return <p>你当前没有拥有任何车辆。</p>;
    }
    return (
        <div>
          <h2>你当前拥有的车辆</h2>
          {ownedCar.map((carIndex) => {
            const car = cars[carIndex];
            if(car.borrower != '0x0000000000000000000000000000000000000000'){
              return (
                  <div>
                    <p>汽车编号：{car.id}</p>
                    <p>汽车主人：{car.owner}</p>
                    <p>当前借用者：{car.borrower}</p>
                    <p>截止日期：{convertUnixTimestamp(car.expireTime)}</p>
                    {<ShowPicture id={car.id} />}
                  </div>
              );
            }else{
              return (
                  <div>
                    <p>汽车编号：{car.id}</p>
                    <p>汽车主人：{car.owner}</p>
                    <p>当前借用者：{'无'}</p>
                    {<ShowPicture id={car.id} />}
                  </div>
              );
            }
          })}
        </div>
    );
  };
    borrowYourCarContract.events.CarBorrowed({}, (error: any, event: { returnValues: any; }) => {
      if (!error) {
        const ret = event.returnValues;
        cars[ret.carTokenId].borrower = ret.borrower;
        cars[ret.carTokenId].expireTime = ret.startTime+ret.duration;
        const newArray = notBorrowed.filter((element) => element !== ret.carTokenId);
        setNotBorrowed(newArray);
      } else {
        console.error("监听事件时出错:", error);
      }
    });
  const handleValueChange = async (value: number | null, carId:number) => {
    if(value == null){
      alert("请输入大于0的有效数字");
    }else{
      const amount = web3.utils.toWei((value*100).toString(), 'ether'); // 转账金额以 wei 为单位
      //授权转账
      await myERC20Contract.methods.approve(borrowYourCarContract.options.address, amount).send({
        from: account
      })
      await borrowYourCarContract.methods.borrowCar(carId,account,value*86400,amount).send({from:account});
    }
  };

  const NotBorrowed: React.FC = () => {
    if (notBorrowed.length === 0 && account != '') {
      return <p>所有车辆均被借出。</p>;
    }
    return (
        <div>
          <h2>可以借用的车辆</h2>
          {notBorrowed.map((carIndex) => {
            const car = cars[carIndex];
            if(car.owner != account){
              return (
                  <div>
                    <p>汽车编号：{car.id}</p>
                    <p>汽车主人：{car.owner}</p>
                    {<ShowPicture id={car.id} />}
                    <InputBox onValueChange={(data) => handleValueChange(data,car.id)} />
                  </div>
              );
            }
          })}
        </div>
    );
  };
  return (
      <div>
        <h1>汽车租赁</h1>
        <div>
          {account === '' && <button onClick={onClickConnectWallet}>连接钱包</button>}
          <div>当前用户：{account === '' ? '无用户连接' : account}</div>
        </div>
        <div>当前用户拥有积分数量：{account === '' ? 0 : accountBalance}</div>
        <button style={{width:'100px',height:'30px'}} onClick={onClaimTokenAirdrop}>领取积分空投</button>
        <div>
          {<UserCars/>}
        </div>
        <div>
          {<NotBorrowed/>}
        </div>
      </div>
  );
};

export default App;