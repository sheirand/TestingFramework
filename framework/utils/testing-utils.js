class TestingUtils{
    
    static genRandomText(len){
        let text = "";
        const charset = "qwertyuiopasdfghjklzxcvbnm";
        for(let i=0; i<len; i++){
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        };
        return text;
    }
};

module.exports = {
    TestingUtils
};
