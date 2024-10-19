package applog

/*
* Use Example
applog.Debug("Server started at :8080")
applog.Info("Server started at :8080")
applog.Warn("Server started at :8080")
applog.Error("Server started at :8080")
*/

import (
	"fmt"
	"runtime"

	"github.com/mattn/go-colorable"
	"github.com/sirupsen/logrus"
)

var logLevel logrus.Level

type ENV int

const (
	PROD ENV = iota
	STG
	DEV
)

func Setenv(env ENV) {
	switch env {
	case PROD:
		logLevel = logrus.InfoLevel
	case STG:
		logLevel = logrus.TraceLevel
	case DEV:
		logLevel = logrus.TraceLevel
	default:
		logLevel = logrus.TraceLevel
	}

	logrus.SetFormatter(&logrus.TextFormatter{
		ForceColors:   true,
		FullTimestamp: true,
	})
	// logrus.SetFormatter(&logrus.JSONFormatter{}) // 出力の形式がJSONになる
	logrus.SetOutput(colorable.NewColorableStdout())
	logrus.SetLevel(logLevel)
}

func Print(args ...interface{}) {
	logrus.Print(args...)
}

func Printf(format string, args ...interface{}) {
	logrus.Printf(format, args...)
}

func Debug(args ...interface{}) {
	logrus.Debug(args...)
}
func Debugf(format string, args ...interface{}) {
	logrus.Debugf(format, args...)
}

func Info(args ...interface{}) {
	logrus.Info(genMessage(args))
}

func Infof(format string, args ...interface{}) {
	logrus.Infof(format, args...)
}

func Warn(args ...interface{}) {
	logrus.Warn(genMessage(args))
}

func Warnf(format string, args ...interface{}) {
	logrus.Warnf(format, args...)
}

func Error(args ...interface{}) {
	logrus.Error(genMessage(args))
}

func Errorf(format string, args ...interface{}) {
	logrus.Errorf(format, args...)
}

func Panic(err ...interface{}) {
	logrus.Panic(err...)
}

func Panicf(format string, args ...interface{}) {
	logrus.Panicf(format, args...)
}

// 実行元のファイル名と行数を取得
func getCaller() (funcName, filepath string, line int) {
	pc, file, line, _ := runtime.Caller(3)
	fn := runtime.FuncForPC(pc).Name()
	return fn, file, line
}

func genMessage(args interface{}) string {
	fn, file, line := getCaller()
	msg := fmt.Sprintf("%s:%d %s %v", file, line, fn, args)
	return msg
}

func CurrentFuncName() string {
	pc, _, _, _ := runtime.Caller(1)
	fn := runtime.FuncForPC(pc).Name()
	return fn
}
