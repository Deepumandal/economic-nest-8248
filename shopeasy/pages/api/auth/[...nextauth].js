import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import dbConnect from "../../../lib/dbConnect";
import authmodal from "../../../modals/auth/authmodal";




const GOOGLE_CLIENT_ID = '1099013241213-kpro4gfoc4shhpu9rijemngqpvi4eupk.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'
const NEXTAUTH_SECRET = "NEXTAUTH_SECRET"
const MONGODB_URI = "mongodb+srv://server:server@cluster0.bgu4xhh.mongodb.net/shopeasy"
const FACEBOOK_CLIENT_ID = '1014907879904094'
const FACEBOOK_CLIENT_SECRET = "6fb1cb2d147bbfe899fc431bcc38db4c"




export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    // ...add more providers here
  ], session: {
    jwt: true
  },

  database: process.env.MONGODB_URI,
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect()

      let isuserexist = await authmodal.find({ email: user.email })

      if (isuserexist.join("") !== "") {

        return true
      }
      const newuser = new authmodal({
        name: user.name,
        email: user.email,
        password: user.name.trim().split(" ")[0] + '@123',
        oauth: account.provider,

      })

      await newuser.save()
      return true
    },
    async session({ session, user, token }) {
      await dbConnect()


      const subject = await authmodal.find({ email: session.user.email })
      // todo

      session.user.role = subject[0].role; // Add role value to user object so it is passed along with session
      session.user.objId = subject[0]._id
      session.token = token
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }

  }, secret: process.env.NEXTAUTH_SECRET


}


export default NextAuth(authOptions)

