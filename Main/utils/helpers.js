module.exports = (sequelize, DataTypes) => {
    
    format_date = (date) => {
        return date.toLocaleDateString();
    }   
    return format_date;
}

