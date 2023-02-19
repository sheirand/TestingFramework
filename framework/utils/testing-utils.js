class TestingUtils{
    
    static genRandomText(len){
        console.info(`Generating random ${len}-char text...`);
        let text = "";
        const charset = "qwertyuiopasdfghjklzxcvbnm";
        for(let i=0; i<len; i++){
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        };
        return text;
    }

    static objectsEquality(object1, object2) {
        console.info(`Checking objects equality...`);
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);
        if (keys1.length !== keys2.length) {
          return false;
        };
        for (const key of keys1) {
          const val1 = object1[key];
          const val2 = object2[key];
          const areObjects = this.isObject(val1) && this.isObject(val2);
          if (areObjects && !this.objectsEquality(val1, val2) || !areObjects && val1 !== val2) {
            return false;
          };
        };
        return true;
    }

    static isObject(object) {
        return object != null && typeof object === 'object';
    }
};

module.exports = {
    TestingUtils
};
