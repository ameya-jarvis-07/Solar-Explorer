# Solar

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages. When you push to the `main` branch, a GitHub Actions workflow will build and deploy the application automatically.

### Enable GitHub Pages (Required First-Time Setup)

1. Go to your repository's **Settings** → **Pages**
2. Under "Build and deployment", select **GitHub Actions** as the Source
3. The workflow will run on the next push to `main` or you can trigger it manually from the Actions tab

Once deployed, your site will be available at: `https://<username>.github.io/<repository-name>/`

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
