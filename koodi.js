var taulukko = [10, 20, 30, 40];
//TEHTÄVÄ 1
function lasku(a,b) {
  console.log(a+b);
}
//TEHTÄVÄ 2
function eka() {
  console.log(taulukko[1]);

}
//TEHTÄVÄ 3
function vertailu(a,b) {
  if ((a + b) <100)
    { console.log("Luku on pienempi kuin sata");
  }
    else
      {console.log("Luku on yli 100");
    }
}
//TEHTÄVÄ 4
function samat(a,b) {
  if (a==b){
    console.log("Luvut ovat samat");
}
  else {
    console.log("Luvut ovat eri");
}
}
//TEHTÄVÄ 5
function sekuntit(a,b,c) {
  console.log(a*3600+b*60+c);
}

//TEHTÄVÄ 6
function ika(a,b,c){
  function muutaVuodet (c)
  {return c * 365.25;
  }

  function muutaKuukaudet(b)
  {
switch (b-1)
{
  case 0:
  return 0;
  break;
    case 1:
    return 31;
    break;
      case 2:
      return 59;
      break;
        case 3:
        return 90;
        break;
          case 4:
          return 120;
          break;
            case 5:
            return 151;
            break;
              case 6:
              return 181;
              break;
                case 7:
                return 212;
                break;
                  case 8:
                  return 243;
                  break;
                    case 9:
                    return 273;
                    break;
                      case 10:
                      return 304;
                      break;
                        case 11:
                        return 334;
                        break;
                          case 12:
                          return 365;
                          break;
                            default:
                            return 0;
                          }
}
Syntymaaika= muutaVuodet(c) + muutaKuukaudet(b) + a;
Nyt = muutaVuodet(2021) + muutaKuukaudet(3)+ 9;
console.log(Nyt-Syntymaaika);
}
