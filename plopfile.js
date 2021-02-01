module.exports = function (plop) {
  plop.setGenerator("component", {
    description: "Create a component",

    prompts: [
      {
        type: "input",
        name: "name",
        message: "Type name of a component:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "plop-templates/component/Component.tsx.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/index.tsx",
        templateFile: "plop-templates/component/index.ts.hbs",
      },
      {
        type: "add",
        path:
          "src/components/{{pascalCase name}}/{{pascalCase name}}.module.pcss",
        templateFile: "plop-templates/component/Component.module.pcss.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.types.ts",
        templateFile: "plop-templates/component/Component.types.ts.hbs",
      },
    ],
  });
};
