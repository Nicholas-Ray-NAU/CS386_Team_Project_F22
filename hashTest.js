const fs = require('fs');

function hashFunction(password){
   let hashValue = 0;
   const passwordArray = password.split("");

   for( let i = 0; i < passwordArray.length; i++ ){
      hashValue += passwordArray[i].charCodeAt(0);
      hashValue *= passwordArray[i].charCodeAt(0);
   }

   hashValue %= 1000;
   return hashValue;
}

function writeDataToFile( hashValue, password){
   let fileString = fs.readFilesync('userData.txt').toString();
   const characterArray = fileString.split("");

   characterArray[characterArray.length] = hashValue + ' ' + password + ' ' + '0' + ' ' + '0' + '\n';
   fileString = characterArray.join("");
   fs.writeFileSync("userData.txt", fileString);
}

function putDataintoArray()
   {
      let fileString = fs.readFilesync('userData.txt').toString();
      const elementArray = fileString.split('\n');
      const hashTable = [];

      for( let i = 0; i < elementArray.length - 1; i++ )
         {
            const current = elementArray[i].split(' ');
            let index = parseInt(current[0]);
            hashTable[index] = elementArray[i];
         }

      return hashTable;
   }
