import md from "./md";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const createExcerpt = (content: string, length: number = 300) => {

       
        // Remove markdown syntax
        const htmlContent = md.render(content);
        //Remove imsages, links, and special character

      const plainText = htmlContent
      .replace(/<img[^>]*>/g, '')
      .replace(/<h[1-6]>/g, '<p>')
      .replace(/<\/h[1-6]>/g,'<p>')
      .replace(/<blockquote>/g,'<p>')
      .replace(/<\/blockquote>/g,'<p>')
      .substring(0, 160);

        //truncate the content to 160 characters
        //remove any incomlete html tags
    const excerpt =
    plainText.length > length
      ? plainText.substring(0, length).trim() + "..."
      : plainText;

        return excerpt;
    }

    export const currentUser = async () => {
      const session = await getServerSession(authOptions);
      return session?.user;
    }