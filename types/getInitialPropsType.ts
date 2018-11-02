type GetInitialProps = {
    pathname: string;
    query: any;
    asPath: string;
    req: Request;
    res: Response;
    jsonPackRes: any;
    err: any;
    renderPage: () => any;
};