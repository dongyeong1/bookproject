module.exports=(sequelize,DataTypes)=>{
    const User =sequelize.define('User',{
        email:{
            type:DataTypes.STRING(100),
            allowNull:false,
            unique:true
        },
        nickname:{
            type:DataTypes.STRING(20),
            allowNull:false,
        },
        password:{
            type:DataTypes.STRING(100),
            allowNull:false,
        },
    },{
        charset:'utf8',
        collate:'utf8_general_ci'
    })
    User.associate=(db)=>{
        db.User.hasMany(db.Post)
        db.User.hasMany(db.Comment)
        db.User.belongsToMany(db.Post,{through:'Like',as:'Liked'})//좋아요관계 유저입장에서 봤을때 liked는 postId가 들어오니까 좋아요된걸 말해준다
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' });
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
        // db.User.belongsToMany(db.Book,{through:'userBook',as:'readed'})

    };
    return User;
}