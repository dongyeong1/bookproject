module.exports=(sequelize,DataTypes)=>{
    const Post =sequelize.define('Post',{
        title:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
        content:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
        rate:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        bookname:{
            type:DataTypes.STRING(1000),
            allowNull:false,
        },
        isbn:{
            type:DataTypes.BIGINT,
            allowNull:false
        },
        src:{
            type:DataTypes.STRING(500),
            allowNull:false,
        }
    },{
        charset:'utf8mb4',
        collate:'utf8mb4_general_ci'
    })
    Post.associate=(db)=>{
        db.Post.belongsTo(db.User); // post.addUser, post.getUser, post.setUser
        db.Post.hasMany(db.Comment); // post.addComments, post.getComments
        // db.Post.hasMany(db.Image); // post.addImages, post.getImages
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }) // post.addLikers, post.removeLikers
    };
    return Post;
}