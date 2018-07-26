const program = require('commander');
const download = require('download-git-repo');

//
// program.version('1.0.0', '-v, --version')
// .command('init <name>')
// .action((name) => {
//   console.log(name);
//   download('https://github.com:yanglei00/react-redux-antd-cli#master', name, {clone: true}, (err) => {
//
//         console.log(err ? 'Error' : 'Success')
//    })
// });
// program.parse(process.argv);

// 命令行交互
const inquirer = require('inquirer');
// inquirer.prompt([
//     {
//         type: 'input',
//         name: 'author',
//         message: '请输入作者名称'
//     }
// ]).then((answers) => {
//
//     if(answers.author == 'rayyang00'){
//       console.log('ok');
//     }else{
//       console.log('error');
//     }
// })

// 渲染模板
const fs = require('fs');
program.version('1.0.0', '-v, --version')
.command('init <name>')
.action((name) => {
    inquirer.prompt([
    {
        name: 'description',
        message: '请输入项目描述'
    },
    {
        name: 'author',
        message: '请输入作者名称'
    }
    ]).then((answers) => {
      console.log(answers)
        download('https://github.com:yanglei00/react-redux-antd-cli#master',name,{clone: true},(err) => {
            const meta = {
                name,
                description: answers.description,
                author: answers.author
            }
            const fileName = `${name}/package.json`;
            const content = fs.readFileSync(fileName).toString();
            const result = handlebars.compile(content)(meta);
            fs.writeFileSync(fileName, result);
        })
    })
});
program.parse(process.argv);


// 视觉美化
// const ora = require('ora');
// // 开始下载
// const spinner = ora('正在下载模板...');
// spinner.start();
// // 下载失败调用
// spinner.fail();
// // 下载成功调用
// spinner.succeed();

/*改变文字颜色*/
// const chalk = require('chalk');
// console.log(chalk.green('项目创建成功'));
// console.log(chalk.red('项目创建失败'));

// const chalk = require('chalk');
// const symbols = require('log-symbols');
// console.log(symbols.success, chalk.green('项目创建成功'));
// console.log(symbols.error, chalk.red('项目创建失败'));
