import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest , NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


connect(); //this is how you connect to database in nextjs

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {email , password} = reqBody;
        console.log(reqBody);

        //check if user Exists or not
        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({
                error: "User doesnot exist",
                status: 400
            })
        }
        //check if password exists
        const validPassword = await bcrypt.compare(password , user.password);

        if(!validPassword){
            return NextResponse.json({
                error: "Invalid Password",
                status: 400
            })
        }

        //create token database
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }
        //create token
        const token = await jwt.sign(tokenData , process.env.JWT_SECRET_TOKEN_KEY! , {
            expiresIn: '1d'
        })

        const response = NextResponse.json({
                message: "login Successfull",
                success: true,
            })
        
        response.cookies.set("token" , token , {
            httpOnly: true,
        })  
        
        return response;

    } 
    catch (error: any) {
        return NextResponse.json({
            error: error.message,
            status: 500,
        })
    }
}