export const getMockResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('react query') || lowerInput.includes('tanstack query')) {
        return "React Query (TanStack Query) is a state management library that simplifies fetching, caching, synchronizing, and updating asynchronous state in React applications. \n\n### Key Benefits:\n- **Caching**: Store data fetched from APIs to avoid redundant network requests.\n- **Background Updates**: Automatically refresh data when the window is refocused or a component remounts.\n- **Pagination & Infinite Scroll**: Built-in support for complex data fetching patterns.\n- **Mutation Hooks**: Easily handle POST/PUT/DELETE requests with loading and error states.";
    }

    if (lowerInput.includes('html')) {
        return "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the content and structure of web pages using a series of elements, such as headings, paragraphs, links, and images.";
    }

    if (lowerInput.includes('css')) {
        return "CSS (Cascading Style Sheets) is a stylesheet language used for describing the presentation of a document written in HTML. It controls the layout, colors, fonts, and overall visual appearance of your website, allowing you to create responsive and beautiful user interfaces.";
    }

    if (lowerInput.includes('javascript') || lowerInput.includes('js')) {
        return "JavaScript is a versatile, high-level programming language that is a core technology of the World Wide Web. It enables interactive web pages and is an essential part of web applications. With modern frameworks like React, Vue, and Angular, JavaScript powers the logic behind stunning user experiences.";
    }

    if (lowerInput.includes('zustand')) {
        return "Zustand is a lightweight state management library for React. It's known for being simple, fast, and having very little boilerplate. Unlike Redux, it doesn't require providers or complex setups, making it a favorite for many modern developers.";
    }

    // Default varied responses
    const defaults = [
        `I've analyzed your prompt concerning "${input}". To provide a dynamic response, please ensure you have configured your OpenAI API Key in the .env file. \n\nIn a production environment, this request would be processed by GPT-4 to provide a highly detailed and context-specific answer tailored exactly to your needs.`,
        `That's a great question about "${input}". While I'm currently running in limited mock mode, I can tell you that implementing this in a SaaS application involves careful state management and a clean UI hierarchy. To see my full potential, try adding a valid OpenAI API key!`,
        `Regarding "${input}", the modern approach is to use modular architecture. This ensures your dashboard remains scalable and easy to maintain. I'm ready to give you a full technical breakdown once the OpenAI integration is fully active.`
    ];

    return defaults[Math.floor(Math.random() * defaults.length)];
};
