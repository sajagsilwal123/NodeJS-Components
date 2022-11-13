// console.log(process.env.SECRET_MESSAGE)

const { attempt } = require("joi")

// const SecretKey = require('crypto').randomBytes(35).toString('hex');
// console.log(test)

// const RemoveLeftRecursion = (grammar)=>{
//     if(!CheckLeftRecursion(grammar))
//         return 'THERE IS NO LEFT RECURSION'
//     let array = grammar.replace(/\s/g,'').split('->')
//     let RHSValue = array[1].split('|')
//     let LHSValue = array.slice(0,array.indexOf('->'))
//     let answer = [];
//     let index = [];
//     console.log(`Input Grammar: ${grammar.replace(/\s/g,'')}`)
//     for(let i = 0;  i < RHSValue.length;i++){
//         for(let j = i; j < RHSValue.length;j++ ){
//             if(LHSValue[0]==RHSValue[i][0] && LHSValue[0]!=RHSValue[j][0]){
//                 let test = `${LHSValue[0]}->${RHSValue[j]}${LHSValue}'`
//                 answer.push(test);
//                 let test1 = `${LHSValue}'->${RHSValue[i].slice(1)}${LHSValue}'|e`
//                 answer.push(test1)                
//                 break 
//             }            
//         }
//         if(LHSValue[0]!=RHSValue[i][0]){
//             let test = `${LHSValue[0]}->${RHSValue[i]}`            
//             answer.push(test)
//             index.push(i);
//         }
//     }
//     let ast = parseInt(index[0])
//     answer.splice(ast+1,1)
//     return answer
// }       

// const CheckLeftRecursion = (grammar) => {
//     let array = grammar.replace(/\s/g, '').split('->')
//     let value = array[1].split('|')
//     let firstVariable = array.slice(0,array.indexOf('->'))
//     for (let i of value)
//         if(i[0]==firstVariable)
//             return true
//     return false
// }

// console.log(RemoveLeftRecursion('E -> E + T | T|Y|i'))

const jwt = require('jsonwebtoken');

const privateKey = 'qwerty'

const emailToken = jwt.sign(  
    {payload : 'sds'},
    privateKey,
    {
        expiresIn: '1d'
    }
)

console.log(emailToken)